picker.onPicked = function () {
    let pickedDate = ` ${picker.getPickedDate().getDateString()}، الموافق ${picker.getOppositePickedDate().getDateString()} `;
    new Inserter(pickedDate, 'date');
    closeInsertBoxes();
};
document.getElementById('close-date-picker-btn').addEventListener('click', event => {
    closeInsertBoxes();
});