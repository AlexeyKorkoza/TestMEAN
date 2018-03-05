import template from './dropdown.html';

const changeTitle = (data, prop) => 
    data
        .map(x => x[prop])
        .join(',');

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
        //TODO: Add label property
        //TODO: Refactor code
        scope.placeholder = scope.ddPlaceholder || 'Select ...';
        scope.multiple = scope.ddMultiple || false;
        scope.property = scope.ddProperty;
        scope.selected = [];
        scope.isOpen = false;
        scope.title = null;
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
                    scope.title = changeTitle(scope.ddModel, scope.property);
                }
            });

        scope.$on('$destroy', cleanup);

        scope.addItem = item => {
            scope.list
                .filter(e => e[scope.ddProperty] === item[scope.ddProperty])
                .filter(e => e.selected = true);
        };

        scope.removeItem = item => {
            const { property } = scope;
            let index = scope.list.findIndex(x => x[property] === item[property]);
            scope.list[index].selected = false;
        };

        scope.selectItem = item => {
            const { property } = scope;
            scope.list
                .filter(x => x[property] === item[property])
                .filter(x => x.selected === false ? scope.addItem(item) : scope.removeItem(item));
            scope.ddModel = scope.list.filter(x => x.selected);
            changeTitle(scope.ddModel, property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.selectAll = () => {
            scope.list.map(item => {
                item.selected = true;
                return item;
            });
            scope.ddModel = scope.list.filter(x => x.selected);
            changeTitle(scope.ddModel, scope.property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        };

        scope.deselectAll = () => {
            scope.ddModel = [];
            scope.list.map(item => {
                item.selected = false;
                return item;
            });
            changeTitle(scope.ddModel, scope.property);
            if (scope.ddFilter) {
                scope.ddFilter(scope.ddModel);
            }
        }
    }
}

export default dropDown;
