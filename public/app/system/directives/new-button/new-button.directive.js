import template from './new-button.html';

function newButton() {
    const directive = {
        template,
        replace: true,
        restrict: 'EA',
        scope: {
            url: '@'
        },
    };
    return directive;
}
   
export default newButton;