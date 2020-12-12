import {RenderPositions} from '../const';
import Abstract from '../view/abstract';

export const render = (container, element, place) => {
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

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (!parent || oldChild === null || newChild === null) {
    throw new Error(`Cant't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const createElement = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;
  return node.firstElementChild;
};
