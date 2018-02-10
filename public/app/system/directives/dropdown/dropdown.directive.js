import template from './dropdown.html';

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

        // scope.$watch(() => console.log(scope));

        scope.changeTitle = () => {
            scope.title = scope.selected
                .map(x => x.text)
                .join(',');
        };

        scope.addItem = item => {
            if (scope.multiple) {
                item.selected = true;
                scope.selected.push(item);
            } else {
                scope.selected.splice(0, 1, item);
            }
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
            scope.ddModel = scope.selected;
            scope.changeTitle();
        };

        scope.selectAll = () => {
            if (scope.selected.length) {
                scope.selected = [];
                scope.list.map(item => {
                    item.selected = false;
                    return item;
                });
            } else {
                scope.selected = scope.list.map(item => {
                    item.selected = true;
                    return item;
                });
            }
            scope.ddModel = scope.selected;
            scope.changeTitle();
        };

        scope.deselectAll = () => {
            scope.ddModel = [];
            scope.selected = [];
            scope.changeTitle();
        }
    }
}

export default dropDown;
