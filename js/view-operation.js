/******** view operation **********/
(function (Cr, doc) {
    /**
     * refresh agent list
     * @param agent_type: agent type
     * @param callback: callback function
     */
    Cr.refreshList = function (agent_type, callback) {
        var data = Cr.data.getData();
        var list_data, summary_data, hisory_data;
        // get agent list data by agent type
        if(agent_type === 'all'){
            list_data = data['physical']['agents'].concat(data['virtual']['agents']);
            hisory_data = data['physical']['history'].concat(data['virtual']['history']);
        } else {
            list_data = data[agent_type]['agents'];
            hisory_data = data[agent_type]['history'];
        }
        summary_data = agentSummary(list_data);
        // render agent information
        Cr.render('agent_list_templ', list_data);
        Cr.render('summary_templ', summary_data);
        Cr.render('history_list_templ', hisory_data);
        callback && callback();

        // summary agent data
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

    /**
     * add resources
     * @param $list_item: which list item to add resources
     * @param resources: array of resources
     */
    Cr.addRes = function ($list_item, resources) {
        // get resource container to append resources element
        var $res_con = Cr.wrap($list_item).getEle(Cr.js_hook.res_container)[0];
        // append all resources to $res_con
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

    /**
     * delete resource
     * @param delete_dom: the span element that user click
     */
    Cr.deleteRes = function (delete_dom) {
        var $delete_dom = Cr.wrap(delete_dom);
        // use the dom that user click to compute which data to update
        var delete_list_index = $delete_dom.parent(Cr.js_hook.agent_item).indexOfParent();
        var delete_res_index = $delete_dom.indexOfParent();
        if(delete_list_index > -1 && delete_res_index > -1){
            // synchronize views and data
            Cr.data.deleteRes(Cr.agent_type, delete_list_index, delete_res_index);
            delete_dom.parentNode.removeChild(delete_dom);
        }
    }
})(window.Cr || (window.Cr = {}), document)