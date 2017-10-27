(function(Cr){
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
    Cr.getData = function () {
        return data;
    };
    Cr.addRes = function (type, resource) {
        data[type].resources.push(resource);
    }
    Cr.deleteRes = function (type, index) {
        data[type].resources.splice(index, 1);
    }
})(window.Cr || (window.Cr = {}));