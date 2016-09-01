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

var t_panels = {
    stat: {
        id: -1,
        v: undefined,
        w: false,
        p: '#/views/JS_01/kdbStatistics',
        o: 'statistic-form'
    },
    rtMap: {
        id: -1,
        v: undefined,
        w: false,
        p: '#/views/EnergyDemoTree/rtMap?:refresh=yes',
        o: 'right-map'
    },
    rtTab: {
        id: -1,
        v: undefined,
        w: false,
        p: '#/views/EnergyDemoTree/rtTab?:refresh=yes',
        o: 'rt-tab'
    },
    /*    rtChart: {
     id: -1,
     v: undefined,
     w: false,
     p: '#/views/EnergyDemoTree/rtChart?:refresh=yes',
     o: 'rt-chart'
     },*/
    arTab: {
        id: -1,
        v: undefined,
        w: false,
        p: '#/views/EnergyDemoTree/arTab?:refresh=yes&archtype=1',
        o: 'ar-tab',
        dat: true
    },
    arChart: {
        id: -1,
        v: undefined,
        w: false,
        p: '#/views/EnergyDemoTree/arChart?:refresh=yes&archtype=1',
        o: 'ar-chart',
        dat: true
    }
};