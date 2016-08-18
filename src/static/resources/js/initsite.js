var siteCfg = {
    local_url: '',
    kdb_url: '',
    tableau_url: '',
    tableau: {
        statistics_path: '#/views/JS_Fast/rtDataPostgress?:refresh=yes',
        map_path: '#/views/JS_Fast/rtDataPostgress?:refresh=yes'
    },
    init: function (local_url, kdb_url, tableau_url) {
        this.local_url = local_url;
        this.kdb_url = kdb_url;
        this.tableau_url = tableau_url;
        return this;
    }
};


