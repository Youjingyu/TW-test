(function(Cr){
    Cr.getData = function () {
        return {
            agents: {
                physical: [
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
                        ip: '192.168.1.2',
                        path: '/var/lib/cruise-agent',
                        resources: ['ubuntu', 'firefox3', 'core-duo']
                    }
                ],
                virtual: [],
            }
        }
    }
})(window.Cr || (window.Cr = {}));