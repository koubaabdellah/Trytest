var process = process || {env: {NODE_ENV: "development"}};
new Vue({
    el: '#main_fieldset',
    computed: {
        items: function() {
            return store.state.tabClasses;
        }
    },
    methods: {
        setActiveTab: function (tabIndex, event) {
            if (event) {
                event.preventDefault()
            }
            store.state.setActiveTab(tabIndex);
        },
        navigate: function(direction, event){
            if (event) {
                event.preventDefault()
            }
            var toPage = getActivePage() + direction;
            store.state.setActiveTab(toPage);
        },
        hideButton: function(tabToHide){
            return {
                display: activeTab === tabToHide? 'none': 'inline-block'
            };
        }
    }
})
