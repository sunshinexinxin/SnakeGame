/**
 *
 * 游戏面板管理器
 *
 */
var PanelManager = (function () {
    function PanelManager() {
        /**面板堆栈*/
        this.panelArray = [];
    }
    var d = __define,c=PanelManager,p=c.prototype;
    PanelManager.getInstance = function () {
        if (PanelManager.instance = null) {
            PanelManager.instance = new PanelManager;
        }
        return PanelManager.instance;
    };
    /**
     * 创建面板
     * @panelName:面板名称
     */
    p.showPanel = function (panelName) {
        var PanelClass = egret.getDefinitionByName(panelName);
        var obj = new PanelClass();
        HierarchyManager.instance.TOPHierarchy.addChild(obj);
        this.panelArray[panelName] = obj;
    };
    /**
     * 销毁面板
     * @panelName：面板名称
     */
    p.disposePanel = function (panelName) {
        HierarchyManager.instance.TOPHierarchy.removeChild(this.panelArray[panelName]);
        this.panelArray[panelName] = null;
    };
    return PanelManager;
}());
egret.registerClass(PanelManager,'PanelManager');
//# sourceMappingURL=PanelManager.js.map