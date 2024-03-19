<template>
  <Dropdown
    v-if="hasUserMenu"
    @menu-closed="handleUserMenuClosed"
    :placement="dropdownPlacement"
  >
    <Button
      class="block shrink-0"
      variant="ghost"
      padding="tight"
    >
      <custom-avatar 
          :name="`${currentUser.first_name} ${currentUser.last_name}`" 
          :avatarUrl="currentUser.avatar"/>
    </Button>

    <template #menu>
      <DropdownMenu class="custom-user-menu">
        <nav class="py-1">
          <component
            :is="item.component"
            v-for="item in formattedItems"
            :key="item.path"
            v-bind="item.props"
            v-on="item.on"
          >
            <span v-if="item.badge" class="mr-1">
              <Badge :extra-classes="item.badge.typeClass">
                {{ item.badge.value }}
              </Badge>
            </span>

            {{ item.name }}
          </component>

          <DropdownMenuItem
            as="button"
            @click="goToProfileUpdate"
          >
            <div class="update-profile-wrapper">
              <custom-avatar 
                :name="`${currentUser.first_name} ${currentUser.last_name}`" 
                :avatarUrl="currentUser.avatar"
              />
              <div class="user-data">
                <div class="user-name">{{currentUser.first_name}} {{currentUser.last_name}}</div>
                <div class="user-type">{{currentUser.user_type}}</div>
              </div>
            </div>
          </DropdownMenuItem>
          <div class="dropdown-divider"></div>
          <DropdownMenuItem
            as="button"
            @click="goToProfile"
          >
            <i class="user-check"></i>
            <span>My Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            as="button"
            v-if="currentUser.impersonating"
            @click="handleStopImpersonating"
          >
            {{ __('Stop Impersonating') }}
          </DropdownMenuItem>
          <div class="dropdown-divider"></div>
          <DropdownMenuItem
            as="button"
            v-if="supportsAuthentication"
            @click="attempt"
          >
          <i class="arrow-right-from-bracket"></i>
            <span>Logout</span>
          </DropdownMenuItem>
        </nav>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>

<script>
import { Inertia } from '@inertiajs/inertia'
import identity from 'lodash/identity'
import isNull from 'lodash/isNull'
import omitBy from 'lodash/omitBy'
import pickBy from 'lodash/pickBy'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Button } from 'laravel-nova-ui'
import CustomAvatar from './CustomAvatar'

export default {
  components: {
    Button,
    CustomAvatar
  },

  props: {
    mobile: { type: Boolean, default: false },
  },

  methods: {
    ...mapActions(['logout', 'stopImpersonating']),
    ...mapMutations(['toggleMainMenu']),

    async attempt() {
      if (confirm(this.__('Are you sure you want to log out?'))) {
        this.logout(Nova.config('customLogoutPath'))
          .then(redirect => {
            if (redirect !== null) {
              location.href = redirect
              return
            }

            Nova.redirectToLogin()
          })
          .catch(e => {
            Inertia.reload()
          })
      }
    },

    goToProfile() {
      Nova.visit(`/resources/${this.currentUser.user_type}s/${this.currentUser.id}`)
    },
    goToProfileUpdate() {
      Nova.visit(`/resources/${this.currentUser.user_type}s/${this.currentUser.id}/edit`)
    },

    handleStopImpersonating() {
      if (confirm(this.__('Are you sure you want to stop impersonating?'))) {
        this.stopImpersonating()
      }
    },

    handleUserMenuClosed() {
      if (this.mobile === true) {
        this.toggleMainMenu()
      }
    },
  },

  computed: {
    ...mapGetters(['currentUser', 'userMenu']),

    userName() {
      return (
        this.currentUser.name || this.currentUser.email || this.__('Nova User')
      )
    },

    formattedItems() {
      return this.userMenu.map(i => {
        let method = i.method || 'GET'
        let props = { href: i.path }

        if (i.external && method == 'GET') {
          return {
            component: 'DropdownMenuItem',
            props: {
              ...props,
              target: i.target || null,
            },
            name: i.name,
            external: i.external,
            on: {},
          }
        }

        return {
          component: 'DropdownMenuItem',
          props: pickBy(
            omitBy(
              {
                ...props,
                method: method !== 'GET' ? method : null,
                data: i.data || null,
                headers: i.headers || null,
                as: method === 'GET' ? 'link' : 'form-button',
              },
              isNull
            ),
            identity
          ),
          external: i.external,
          name: i.name,
          on: {},
          badge: i.badge,
        }
      })
    },

    hasUserMenu() {
      return (
        this.currentUser &&
        (this.formattedItems.length > 0 ||
          this.supportsAuthentication ||
          this.currentUser.impersonating)
      )
    },

    supportsAuthentication() {
      return (
        Nova.config('withAuthentication') === true ||
        this.customLogoutPath !== false
      )
    },

    customLogoutPath() {
      return Nova.config('customLogoutPath')
    },

    componentName() {
      return 'Dropdown'
    },

    dropdownPlacement() {
      return this.mobile === true ? 'top-start' : 'bottom-end'
    },
  },
}
</script>
