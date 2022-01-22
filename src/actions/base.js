export function sendFilterState(type, filterState) {
  return {
    type: type,
    payload: filterState
  }
}
