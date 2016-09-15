% rebase('v2/main.tpl')

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3">
            <div id="left-tree"></div>
        </div>
        <div class="col-sm-9">
            <div class="row">
                <div class="col-sm-7">
                    <h4 id="selected-node"><< Please, select a consumer</h4>

                    <div id="right-map"></div>
                </div>
                <div class="col-sm-5">
                    <h4>System Statistics</h4>

                    <div class="row">
                        <div class="col-sm-7">
                            <div id="statistic-form"></div>
                            <div id="statistic-form2"></div>
                        </div>
                        <div class="col-sm-5">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div id="right-data-tabs" class="container nopadding">
                        <ul class="nav nav-pills">
                            <li class="active">
                                <a href="#sheet-rt-tab" data-toggle="tab">Current Data</a>
                            </li>
                            <li><a href="#sheet-ar-tab" data-toggle="tab">Archive Data</a>
                            </li>
                            <li><a href="#sheet-ar-chart" data-toggle="tab">Archive Chart</a>
                            </li>
                        </ul>

                        <div class="tab-content clearfix">
                            <div class="tab-pane active" id="sheet-rt-tab">
                                <div id="rt-tab" class="right-tabs-sheet"></div>
                                <div id="rt-tab2" class="right-tabs-sheet2">
                                    <table id="rt-tab-2t"></table>
                                    <!--This will replace by js -->
                                </div>
                            </div>
                            <div class="tab-pane" id="sheet-ar-tab">
                                <div id="ar-tab" class="right-tabs-sheet"></div>
                            </div>
                            <div class="tab-pane" id="sheet-ar-chart">
                                <div id="ar-chart" class="right-tabs-sheet"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
