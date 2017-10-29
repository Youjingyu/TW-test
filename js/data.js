/******** data operation **********/
(function(Cr){
    // test data(get from server in production)
    var data = {
        physical: {
            agents: [
                {
                    name: 'bjstdmngbgr02.thoughtworks.com',
                    status: 'idle',
                    ip: '192.168.1.2',
                    path: '/var/lib/cruise-agent',
                    resources: ['ubuntu', 'firefox3', 'core-duo']
                },
                {
                    name: 'bjstdmngbgr02.thoughtworks.com',
                    status: 'building',
                    ip: '192.168.1.3',
                    path: '/var/lib/cruise-agent',
                    resources: ['ubuntu', 'firefox3', 'core-duo']
                },
                {
                    name: 'bjstdmngbgr02.thoughtworks.com',
                    status: 'building',
                    ip: '192.168.1.4',
                    path: '/var/lib/cruise-agent',
                    resources: ['ubuntu', 'firefox3', 'core-duo']
                },
                {
                    name: 'bjstdmngbgr02.thoughtworks.com',
                    status: 'idle',
                    ip: '192.168.1.5',
                    path: '/var/lib/cruise-agent',
                    resources: ['ubuntu', 'firefox3', 'core-duo']
                }
            ],
            history: ['bjstdmngbgr02/Acceptance_test', 'bjstdmngbgr03/Acceptance_test', 'bjstdmngbgr03/Acceptance_test', 'bjstdmngbgr03/Acceptance_test']
        },
        virtual: {
            agents: [
                {
                    name: 'bjstdmngbgr02.thoughtworks.com',
                    status: 'building',
                    ip: '192.168.1.8',
                    path: '/var/lib/cruise-agent',
                    resources: ['ubuntu', 'firefox3', 'core-duo']
                }
            ],
            history: ['bjstdmngbgr08/Acceptance_test']
        },
    };
    var data_operation = {
        // get resources
        getData: function () {
            return data;
        },
        /**
         * add resources
         * @param type: agent type
         * @param list_index: the list item user is operating
         * @param res_index: the resources array wants to add
         */
        addRes: function (type, list_index, resources) {
            var po = getUpdateDataPosition(type, list_index);
            data[po.type].agents[po.index].resources = data[po.type].agents[po.index].resources.concat(resources);
        },
        /**
         * delete resource
         * @param type: agent type
         * @param list_index: the list item user is operating
         * @param res_index: the resource item user wants to delete
         */
        deleteRes: function (type, list_index, res_index) {
            var po = getUpdateDataPosition(type, list_index);
            data[po.type].agents[po.index].resources.splice(res_index, 1);
        }
    }
    Cr.data = data_operation;

    // get which data to update according to user's operation
    function getUpdateDataPosition(type, list_index) {
        // default position
        var data_to_update = {
            type: type,
            index: list_index
        }
        // if user is operating 'all' data,
        // we need to judge whether the user is operating 'physical' or 'virtual'
        if(type === 'all'){
            var physical_len = data.physical.agents.length;
            if(list_index > physical_len - 1){
                data_to_update = {
                    type: 'virtual',
                    index: list_index - physical_len
                };
            } else {
                data_to_update.type = 'physical';
            }
        }
        return data_to_update;
    }
})(window.Cr || (window.Cr = {}));