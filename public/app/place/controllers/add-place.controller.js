addPlaceCtrl.$inject = ['$state', 'typeService', 'placeService'];

function addPlaceCtrl($state, typeService, placeService) {

  const vm = this;
  vm.select = [];
  vm.activate = activate;
  vm.add = add;

  activate();

  function activate() {

    vm.myConfig = {
      create: false,
      valueField: 'value',
      labelField: 'text',
      delimiter: '|',
      placeholder: 'Choose type object',
      maxItems: 1
    };

    typeService.getAll()
        .then(response => {
      response.data.forEach(item => {
        vm.select.push({
          value: item.id_type,
          text: item.name_type
        });
      });
    });

  }

  function add() {
    if (vm.addData.id_type) {
      placeService.create(vm.addData)
        .then(() => {
          swal(
            'place was added',
            'Please, click ОК for continue',
            'success'
          );
          $state.go('places_all');
        })
        .catch(() => {
          swal(
            'place was not added',
            'Check input data',
            'error'
          );
        });
    } else {
      vm.error = 'Choose type object';
    }
  }
}

export default addPlaceCtrl;
