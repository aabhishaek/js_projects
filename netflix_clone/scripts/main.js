const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

// Remove border from item
const removeBorder = (e) => {
    tabItems.forEach(item => item.classList.remove('tab-border'));
}

// Hide content
const hideContent = (e) => {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

//Select tab content item
function selectItem () {
    removeBorder();
    hideContent();

    // Add border to current tab
    this.classList.add('tab-border');

    //Grab content from dom
    const tabContentItem = document.querySelector(`#${this.id}-content`);

    //Enable content
    tabContentItem.classList.add('show');
}

// Listen for tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));