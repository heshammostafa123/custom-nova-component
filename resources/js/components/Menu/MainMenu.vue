<template>
    <div>
        <div class="sidebar-header">
            <div class="logo">
                <h1 class="logo-lg">Almohamdy</h1>
                <h1 class="logo-sm">AL</h1>
            </div>
            <div class="hide-wrapper">
                <button
                    @click="
                        customToggleSidebar();
                    "
                    class="custom-toggle-sidebar"
                >
                    <img
                        class="img-icon-md unfix-btn"
                        :src="`${baseUrl}/img/icons/toggle-icon.svg`"
                        alt="toggle-icon"
                    />
                    <img
                        class="img-icon-md fix-btn"
                        :src="`${baseUrl}/img/icons/toggle-icon-02.svg`"
                        alt="toggle-icon"
                    />
                </button>
            </div>
        </div>
        <div class="menu-inner-shadow"></div>
        <div
            v-if="hasItems"
            class="sidebar-menu pb-24 space-y-6"
            dusk="sidebar-menu"
            role="navigation"
            :key="reRender"
        >
            <component
                :key="item.key"
                :is="item.component"
                v-for="item in mainMenu"
                :item="item"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "MainMenu",
    computed: {
        ...mapGetters(["mainMenu"]),

        hasItems() {
            return this.mainMenu.length > 0;
        },
    },
    data() {
        return {
            reRender: 1,
            baseUrl: "",
        };
    },
    mounted() {
        this.baseUrl = window.location.origin;
        if (localStorage.getItem("current_sidebar_state")) {
            const currentClass = JSON.parse(
                localStorage.getItem("current_sidebar_state")
            );
            document.documentElement.classList.add(currentClass);
            if (currentClass == "custom-show-sidebar") {
            } else if (currentClass == "custom-hide-sidebar") {
            }
        } else {
            document.documentElement.classList.add("custom-show-sidebar");
        }
        Nova.$on('collapse', () => {
            Object.keys(localStorage).forEach((key) => {
                if (key.includes("nova.navigation") && key.includes(".collapsed")) {
                    localStorage.setItem(key, "false");
                    // localStorage.removeItem(key);
                    this.reRender += 1;
                }
            });
        })
    },
    methods: {
        ...mapActions(['logout', 'stopImpersonating']),
        customToggleSidebar() {var currentClass = document.documentElement.classList.contains(
                "custom-hide-sidebar"
            );

            if (currentClass) {
                setTimeout(() => {
                    document.documentElement.classList.remove(
                        "custom-hide-sidebar"
                    );
                    document.documentElement.classList.add(
                        "custom-show-sidebar"
                    );
                    if (localStorage.getItem("current_sidebar_state")) {
                        localStorage.removeItem("current_sidebar_state");
                        localStorage.setItem(
                            "current_sidebar_state",
                            JSON.stringify("custom-show-sidebar")
                        );
                    } else {
                        localStorage.setItem(
                            "current_sidebar_state",
                            JSON.stringify("custom-show-sidebar")
                        );
                    }
                }, 200);
            } else {
                setTimeout(() => {
                    document.documentElement.classList.remove(
                        "custom-show-sidebar"
                    );
                    document.documentElement.classList.add(
                        "custom-hide-sidebar"
                    );
                    if (localStorage.getItem("current_sidebar_state")) {
                        localStorage.removeItem("current_sidebar_state");
                        localStorage.setItem(
                            "current_sidebar_state",
                            JSON.stringify("custom-hide-sidebar")
                        );
                    } else {
                        localStorage.setItem(
                            "current_sidebar_state",
                            JSON.stringify("custom-hide-sidebar")
                        );
                    }
                }, 100);
            }
            // Only run one condition
            return false;
        },
    },
};
</script>
