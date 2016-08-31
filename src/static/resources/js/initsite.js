var siteCfg = {
    local_url: '',
    kdb_url: '',
    tableau_url: '',
    auto_refresh: false,
    init: function (local_url, kdb_url, tableau_url) {
        this.local_url = local_url;
        this.kdb_url = kdb_url;
        this.tableau_url = tableau_url;
        return this;
    }

};

var frames = {
    stat: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/JS_01/kdbStatistics',
        o: 'statistic-form'
    },
    rtMap: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/EnergyDemoTree/rtMap?:refresh=yes',
        o: 'right-map'
    },
    rtTab: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/EnergyDemoTree/rtTab?:refresh=yes',
        o: 'right-rt-tab'
    },
    arTab: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/EnergyDemoTree/arTab?:refresh=yes',
        o: 'right-ar-tab'
    },
    rtGraph: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/EnergyDemoTree/rtChart?:refresh=yes',
        o: 'right-rt-chart'
    },
    arGraph: {
        id: -1,
        v: undefined,
        s: undefined,
        p: '#/views/EnergyDemoTree/arChart?:refresh=yes',
        o: 'right-ar-chart'
    }
};