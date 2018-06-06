var ConstList = [{
    name: "苹果",
    id: "AF01001"
}, {
    name: "鸡蛋",
    id: "AL05001"
}, {
    name: "猪肉",
    id: "AL01002"
}, {
    name: "活草鱼",
    id: "AM01002"
}];

var idList = {};
for(var i = 0; i < ConstList.length; i++) {
    idList[ConstList[i].name] = ConstList[i].id;
}

var nameList = [];
for(var i = 0; i < ConstList.length; i++) {
    nameList[ConstList[i].id] = ConstList[i].name;
}

exports.getList = function(index) {
    if(index != null && index < ConstList.length) {
        return ConstList[index];
    }
    return ConstList;
};
exports.getListName = function(index) {
    if(index != null && index < ConstList.length) {
        return ConstList[index].name;
    }
    var name = [];
    for(var i = 0; i < ConstList.length; i++) {
        name.push(ConstList[i].name);
    }
    return name;
};

exports.getListId = function(index) {
    if(index != null && index < ConstList.length) {
        return ConstList[index].id;
    }
    var id = [];
    for(var i = 0; i < ConstList.length; i++) {
        id.push(ConstList[i].id);
    }
    return id;
};

exports.getNameById = function(id) {
    return nameList[id];
};

exports.getIdByName = function(name) {
    return idList[name];
};