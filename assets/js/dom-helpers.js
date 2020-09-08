/**
 * Wrapper for the node.querySelector method.
 *
 * @param {string} selector Valid CSS selector
 * @param {Document|Element|HTMLElementTagNameMap} [node=document]
 * @return {HTMLElementTagNameMap|null}
 */
const qs = (selector, node = document) => node.querySelector(selector);

/**
 * Wrapper for the node.querySelectorAll method.
 *
 * @param selector
 * @param node
 * @return {NodeListOf<Element>}
 */
const qsAll = (selector, node = document) => node.querySelectorAll(selector);

export {
  qs,
  qsAll,
};
