LocalStorage = {
  SetLocalStorage: function (storage, dataobj, time) {
    var saveDate = new Date();
    if(time){
      var deadTime = saveDate.valueOf();
      var dateNum = time.substring(0, time.length - 1);
      if (/^[0-9]*$/.test(dateNum)) {
        switch (time.substr(-1)) {
          case 'd':
          case 'D':
            deadTime = deadTime + dateNum * 24 * 60 * 60 * 1000;
            break;
          case 'h':
          case 'H':
            deadTime = deadTime + dateNum * 60 * 60 * 1000;
            break;
          case 'm':
          case 'M':
            deadTime = deadTime + dateNum * 60 * 1000;
            break;
          case 's':
          case 'S':
            deadTime = deadTime + dateNum * 1000;
            break;
          default:
            console.log('时间单位必须为D,H,M,S');
            return false;
            break;
        }
        var deadTime = new Date(deadTime);
        var data = {
          Value: dataobj,
          DeadTime: deadTime,
          SaveTime: saveDate
        };
        window.localStorage.setItem(storage, JSON.stringify(data));
      } else {
        console.log('时间格式错误');
      }
    }else{
      var data = {
        Value: dataobj,
        DeadTime: null,
        SaveTime: saveDate
      };
      window.localStorage.setItem(storage, JSON.stringify(data));
    }
  },
  GetLocalStorage: function (storage) {
    var thisStorage = JSON.parse(window.localStorage.getItem(storage));
    if (thisStorage) {
      if(thisStorage.DeadTime){
        var date = new Date();
        var deadTime = new Date(thisStorage.DeadTime);
        if (date < deadTime) {
          return thisStorage.Value;
        } else {
          window.localStorage.removeItem(storage);
        }
      }else{
        return thisStorage.Value;
      }
    }
  }
};

module.exports = LocalStorage;
