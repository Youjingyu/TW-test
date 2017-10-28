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

    Cr.addRes = function ($list_item, resources) {
        var $res_con = Cr.wrap($list_item).getEle(Cr.js_hook.res_container)[0];
        resources.forEach(function (resource) {
            var $span = doc.createElement('span');
            $span.textContent = resource;
            var $i = doc.createElement('i');
            $i.setAttribute('class', 'cr-main-item-icon cr-main-item-delete js-delete-res');
            $span.appendChild($i);
            $res_con.appendChild($span);
        });
        // synchronize views and data
        Cr.data.addRes(Cr.agent_type, Cr.wrap($list_item).indexOfParent(), resources);
    }

    Cr.deleteRes = function (delete_dom) {
        var delete_list_index = Cr.wrap(delete_dom.parentNode.parentNode.parentNode.parentNode).indexOfParent();
        var delete_res_index = Cr.wrap(delete_dom).indexOfParent();
        if(delete_list_index > -1 && delete_res_index > -1){
            // synchronize views and data
            Cr.data.deleteRes(Cr.agent_type, delete_list_index, delete_res_index);
            delete_dom.parentNode.removeChild(delete_dom);
        }
    }
})(window.Cr || (window.Cr = {}), document)