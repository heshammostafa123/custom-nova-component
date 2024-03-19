import AppLayout from './layouts/AppLayout';

Nova.booting((app, store) => {
    app.Layout("AppLayout", AppLayout);
});