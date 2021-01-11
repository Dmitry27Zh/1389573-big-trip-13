import {RenderPositions} from '../const';
import Abstract from '../view/abstract';

export const render = (container, element, place = RenderPositions.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (place) {
    case RenderPositions.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPositions.BEFOREEND:
      container.append(element);
      break;
  }
};

export const replaceElements = (newElement, oldElement) => {
  let newChild = newElement;
  let oldChild = oldElement;
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (!parent || !(oldChild instanceof HTMLElement) || !(newChild instanceof HTMLElement)) {
    throw new Error(`Cant't replace unexisting elements`);
  }
  parent.replaceChild(newChild, oldChild);
};

export const createElement = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;
  return node.firstElementChild;
};

export const removeElement = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only component`);
  }
  component.getElement().remove();
  component.removeElement();
};
