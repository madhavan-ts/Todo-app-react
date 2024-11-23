import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

function useSortableSensor() {
  const keyboardSensor = useSensor(KeyboardSensor, {

  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(keyboardSensor, mouseSensor, touchSensor);
  return sensors;
}

export { useSortableSensor };