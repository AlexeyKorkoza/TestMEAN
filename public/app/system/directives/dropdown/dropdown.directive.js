import template from './dropdown.html';

function dropDown() {
    const directive = {
        template,
        replace: true,
        restrict: 'EA',
        scope: {
            ddModel: '=',
            ddPlaceholder: '@',
            ddMultiple: '=',
        },
        link,
    };

    return directive;

    function link(scope, element) {
        scope.placeholder = scope.ddPlaceholder;
        scope.multiple = scope.ddMultiple;
        scope.selected = [];
        scope.isOpen = false;
        scope.title = '';
        scope.list = scope.ddModel.map(item => {
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
                const index = scope.list.findIndex(x => x.id === item.id);
            }
        };

        scope.removeItem = item => {
            let index = scope.selected.findIndex(x => x.id === item.id);
            scope.selected.splice(index, 1);
            index = scope.list.findIndex(x => x.id === item.id);
            scope.list[index].selected = false;
        };

        scope.selectItem = item => {
            const index = scope.selected.findIndex(x => x.id === item.id);
            index === -1 ? scope.addItem(item) : scope.removeItem(item);
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
            scope.changeTitle();
        };
    }
}

export default dropDown;
