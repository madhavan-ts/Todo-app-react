import IconCheck from "/icon-check.svg";
function CheckBox({ isChecked, onClick }) {
  return (
    <span
      onClick={onClick}
      className={`checkbox checkbox--${isChecked ? "checked" : "unchecked"}`}
    >
      {isChecked && <img src={IconCheck} alt="" />}
    </span>
  );
}
export default CheckBox;
