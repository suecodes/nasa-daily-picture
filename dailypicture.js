class DailyPicture {
  constructor() {
    this.currentDate = new Date();
  }

  incrementDate() {
    var newdate = new Date(this.currentDate);
    newdate.setDate(newdate.getDate() + 1);
    this.currentDate = newdate;
  }

  decrementDate() {
    var newdate = new Date(this.currentDate);
    newdate.setDate(newdate.getDate() - 1);
    this.currentDate = newdate;
  }

  isToday() {
    const today = new Date();
    return (
      this.currentDate.getDate() == today.getDate() &&
      this.currentDate.getMonth() == today.getMonth() &&
      this.currentDate.getFullYear() == today.getFullYear()
    );
  }
}
