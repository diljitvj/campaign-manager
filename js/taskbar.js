// This module handles the searchbar and global delete button contents
(function() {
  const $searchInput = document.querySelector(".search-bar input");
  // Debounce the event so that the handler is not fired on every keyup event
  $searchInput.addEventListener("keyup", Utils.debounce(handleKeyUp, 200));

  // Update the store with the search text
  function handleKeyUp(event) {
    const searchText = event.target.value;
    Store.updateSearchText(searchText);
  }

  // Change the innerHTML and class of button based on the current selected campaigns
  function handleSelection() {
    const $deleteButton = document.querySelector("button#delete-selected");
    const { selectedCampaignIds } = Store;
    if (selectedCampaignIds.length) {
      $deleteButton.removeAttribute("disabled");
      $deleteButton.innerHTML = `Delete (${selectedCampaignIds.length})`;
    } else {
      $deleteButton.disabled = true;
      $deleteButton.innerHTML = `Delete`;
    }
  }

  // Event subscriptions
  EventMod.on("toggleSelection", handleSelection);
  EventMod.on("deleteCampaign", handleSelection);
})();
