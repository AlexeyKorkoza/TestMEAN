import template from './dropdown.html';

const changeTitle = (data, prop) => {
    return data
        .map(x => x[prop])
        .join(',');
};

function dropDown() {
    const directive = {
        template,
        replace: true,
        restrict: 'EA',
        scope: {
            ddModel: '=',
            ddData: '=',
            ddPlaceholder: '@',
            ddMultiple: '=',
            ddProperty: '@',
            ddFilter: '='
        },
        link,
    };

    return directive;

    function link(scope, element) {
        scope.placeholder = scope.ddPlaceholder;
        scope.multiple = scope.ddMultiple || false;
        scope.property = scope.ddProperty;
        scope.selected = [];
        scope.isOpen = false;
        scope.title = '';
        scope.list = scope.ddData.map(item => {
            item.selected = false;
            return item;
        });

        scope.toggle = () => {
            scope.isOpen = !scope.isOpen;
        };

        const handler = event => {
            const wrapper = event.target.closest('.dropdown-wrapper');
            if (!wrapper || (wrapper !== element[0])) {
                scope.$apply(() => {
                    scope.isOpen = false;
                });
            }
        };

        document.addEventListener('click', handler);
        scope.$on('$destroy', () => {
            document.removeEventListener('click', handler);
        });

        const cleanup = scope.$watch(
            () => scope.ddModel, 
            (newValue, oldValue) => { 
            if (newValue !== oldValue) {
                scope.title = changeTitle(scope.selected, scope.property);
            }
        });

        scope.$on('$destroy', cleanup);

        scope.addItem = item => {
            console.log('Item', item);
            if (scope.multiple) {
                item.selected = true;
                scope.selected.push(item);
            } else {
                scope.selected.splice(0, 1, item);
            }
            scope.ddModel = [].concat(scope.selected);
        };

        scope.removeItem = item => {
            const property = scope.property;
            let index = scope.selected.findIndex(x => x[property] === item[property]);
            scope.selected.splice(index, 1);
            index = scope.list.findIndex(x => x.id === item.id);
            scope.list[index].selected = false;
        };

        scope.selectItem = item => {
            const property = scope.property;
            let index = scope.selected.findIndex(x => x[property] === item[property]);
            index === -1 ? scope.addItem(item) : scope.removeItem(item);
            // TODO FIX arr.
            scope.ddModel = [].concat(scope.selected);
            changeTitle(scope.selected, scope.property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.selectAll = () => {
            scope.selected = scope.list.map(item => {
                item.selected = true;
                return item;
            });
            scope.ddModel = [].concat(scope.selected);
            changeTitle(scope.selected, scope.property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.deselectAll = () => {
            scope.ddModel = [];
            scope.selected = [];
            changeTitle(scope.selected, scope.property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        }
    }
}

export default dropDown;
