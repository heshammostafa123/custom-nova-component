import ResourceIndex from "./components/ResourceIndex";
import ResourceTableToolbar from "./components/ResourceTableToolbar";
import UserMenu from "./components/UserMenu";
import FilterMenu from "./components/FilterMenu";
import ResourcePagination from "./components/Pagination/ResourcePagination";
import PaginationLinks from "./components/Pagination/PaginationLinks";
import MainMenu from "./components/Menu/MainMenu";
import MenuSection from "./components/Menu/MenuSection";
import Breadcrumbs from "./components/Menu/Breadcrumbs";

Nova.booting((app, store) => {
    app.component("ResourceIndex", ResourceIndex);
    app.component("ResourceTableToolbar", ResourceTableToolbar);
    app.component("UserMenu", UserMenu);
    app.component("FilterMenu", FilterMenu);
    app.component("ResourcePagination", ResourcePagination);
    app.component("PaginationLinks", PaginationLinks);
    app.component("MainMenu", MainMenu);
    app.component("MenuSection", MenuSection);
    app.component("Breadcrumbs", Breadcrumbs);
});
