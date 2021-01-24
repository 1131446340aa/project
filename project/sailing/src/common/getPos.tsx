function getPos(currentEle: HTMLElement, e: MouseEvent) {
  currentEle.style.top = e.clientY + 'px'
  currentEle.style.left = e.clientX + 'px'
}

export default getPos
