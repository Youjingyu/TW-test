(function (Cr, doc) {
    Cr.refreshList = function (agent_type, callback) {
        var data = Cr.data.getData();
        var list_data, summary_data, hisory_data;
        if(agent_type === 'all'){
            list_data = data['physical']['agents'].concat(data['virtual']['agents']);
            hisory_data = data['physical']['history'].concat(data['virtual']['history']);
        } else {
            list_data = data[agent_type]['agents'];
            hisory_data = data[agent_type]['history'];
        }
        summary_data = agentSummary(list_data);
        // init agents information
        Cr.render('agent_list_templ', list_data);
        Cr.render('summary_templ', summary_data);
        Cr.render('history_list_templ', hisory_data);
        callback && callback();

        function agentSummary(data) {
            var summary = {
                building: 0,
                idle: 0
            }
            data.forEach(function (ele) {
                if(ele.status === 'building'){
                    summary.building ++;
                } else if(ele.status === 'idle'){
                    summary.idle ++;
                }
            });
            return summary;
        }
    };

    Cr.addRes = function ($res_con, res_data) {
        var span = doc.createElement('span');
    }

    Cr.deleteRes = function (delete_dom) {
        var delete_list_index = Cr.wrap(delete_dom.parentNode.parentNode.parentNode.parentNode).indexOfParent();
        var delete_res_index = Cr.wrap(delete_dom).indexOfParent();
        if(delete_list_index > -1 && delete_res_index > -1){
            var type = Cr.getEle('#main_nav').getEle('.active')[0].getAttribute('data-agent-type');
            // synchronize views and data
            Cr.data.deleteRes(type, delete_list_index, delete_res_index);
            delete_dom.parentNode.removeChild(delete_dom);
        }
    }
})(window.Cr || (window.Cr = {}), document)