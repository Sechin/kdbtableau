var siteCfg = {
    local_url: '',
    kdb_url: '',
    tableau_url: '',
    init: function (local_url, kdb_url, tableau_url) {
        this.local_url = local_url;
        this.kdb_url = kdb_url;
        this.tableau_url = tableau_url;
        return this;
    }
};

var func_def = {
    init: function () {
        this.idColPos = -1;
        for (var i = 0; i < this.cols.length; i++) {
            this.cols[i].i = -1;
            if (!this.cols[i].hasOwnProperty("f"))
                this.cols[i].f = -1;
            if (!this.cols[i].hasOwnProperty("n"))
                this.cols[i].n = this.cols[i].fn;
        }
    },
    configure: function (tableau_cols) {
        this.init();
        for (var i = 0; i < this.cols.length; i++) {
            for (var j = 0; j < tableau_cols.length; j++) {
                if (tableau_cols[j].$impl.$fieldName == this.cols[i].fn) {
                    this.cols[i].i = tableau_cols[j].$impl.$index;
                    break;
                }
            }
        }
        if (this.hasOwnProperty("idColName")) {
            for (var k = 0; k < tableau_cols.length; k++) {
                if (tableau_cols[k].$impl.$fieldName == this.idColName) {
                    this.idColPos = k;
                    break;
                }
            }
        }
    }
};

var cfg_stat = {
    name: 'System Statistics',
    cols: [
        {
            fn: 'k',
            n: 'Name',
            f: -1
        },
        {
            fn: 'v',
            n: 'Value',
            f: -1
        }
    ],
    idColName: "id",
    idColPos: -1,
    init: func_def.init,
    configure: func_def.configure
};

var cfg_rt = {
    name: 'Current Data',
    cols: [
        {
            fn: 'name',
            n: 'Name',
            f: -1
        },
        {
            fn: 'p',
            n: 'P',
            f: 0
        },
        {
            fn: 'q',
            n: 'Q',
            f: 0
        },
        {
            fn: 'f',
            n: 'F',
            f: 3
        },
        {
            fn: 'cosf',
            n: 'cosF',
            f: 4
        },
        {
            fn: 'i',
            n: 'I',
            f: 0
        },
        {
            fn: 'u',
            n: 'U',
            f: 0
        },
        {
            fn: 'ia',
            n: 'Ia',
            f: 0
        },
        {
            fn: 'ib',
            n: 'Ib',
            f: 0
        },
        {
            fn: 'ic',
            n: 'Ic',
            f: 0
        },
        {
            fn: 'uab',
            n: 'Uab',
            f: 0
        },
        {
            fn: 'ubc',
            n: 'Ubc',
            f: 0
        },
        {
            fn: 'uca',
            n: 'Uca',
            f: 0
        }
    ],
    idColName: "id",
    idColPos: -1,
    init: func_def.init,
    configure: func_def.configure
};




var t_panels = {
    stat: {
        p: '/views/EnergyDemoTree/kdbStatistics?:refresh=yes',
        o: 'statistic-form',
        rt: {
            v: 1000,
            id: {}
        },
        useId: false,
        ownCtr: true,
        attrDT: {
            'searching': false,
            'info': false,
            'paging': false
        }
    },
    rtTab: {
        p: '/views/EnergyDemoTree/rtTab?:refresh=yes',
        o: 'rt-tab',
        rt: {
            v: 1000,
            id: {}
        },
        ownCtr: true
    },
    rtMap: {
        p: '/views/EnergyDemoTree/rtMap?:refresh=yes',
        o: 'right-map'
    },
    /*    rtChart: {
     p: '#/views/EnergyDemoTree/rtChart?:refresh=yes',
     o: 'rt-chart'
     },*/
    arTab: {
        p: '/views/EnergyDemoTree/arTab?:refresh=yes&archtype=1',
        o: 'ar-tab',
        dat: true
    },
    arChart: {
        p: '/views/EnergyDemoTree/arChart?:refresh=yes&archtype=1',
        o: 'ar-chart',
        dat: true
    }
};


/*  Main code */
t_panels.stat.cfg = cfg_stat;
t_panels.rtTab.cfg = cfg_rt;
for (var o in t_panels) {
    if (t_panels.hasOwnProperty(o) && typeof t_panels[o] !== "function") {
        var e = t_panels[o];
        if (!e.hasOwnProperty('dat'))
            e.dat = false;
        if (!e.hasOwnProperty('useId'))
            e.useId = true;
        if (!e.hasOwnProperty('ownCtr'))
            e.ownCtr = false;
        if (!e.hasOwnProperty('id'))
            e.id = -1;
        if (!e.hasOwnProperty('v'))
            e.v = undefined;
        if (!e.hasOwnProperty('w'))
            e.w = false;
        if (!e.hasOwnProperty('cfg'))
            e.cfg = null;
        if (!e.hasOwnProperty('rt'))
            e.rt = {v: 0, id: {}}
        if (!e.hasOwnProperty('attrDT'))
            e.attrDT = {}
        if (!e.hasOwnProperty('canRefresh'))
            e.canRefresh = true;
    }
}
