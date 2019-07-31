// This module takes care of the render and updates of the campaign table
const Campaign = (function() {
  // Renders the current page in the campaign table
  function render() {
    const campaigns = Store.getCurrentCampaignResultPage();
    const { selectedCampaignIds } = Store;

    const campaignResultInnerHtml = campaigns
      .map(c =>
        TemplateEngine.renderCampaignRow(
          c,
          selectedCampaignIds.indexOf(c._id) !== -1
        )
      )
      .join("");

    const $tableBody = document.querySelector("table tbody");

    $tableBody.innerHTML = campaignResultInnerHtml;
  }

  // Shows the Edit modal and populates with campaign details
  function showEditModal(id) {
    const campaign = Store.getCampaignById(id);
    if (campaign) {
      const editModalTemplate = TemplateEngine.renderEditCampaignModal(
        campaign
      );
      const $modalWrapperEl = document.querySelector(".modal-wrapper");
      $modalWrapperEl.classList.remove("hide");
      $modalWrapperEl.innerHTML = editModalTemplate;
    }
  }

  // Close the edit modal
  function closeEditModal() {
    const $modalWrapperEl = document.querySelector(".modal-wrapper");
    $modalWrapperEl.innerHTML = "";
    $modalWrapperEl.classList.add("hide");
  }

  // Handler for the save update of campaign
  function onUpdateHandler(id) {
    const $nameInput = document.querySelector(
      ".edit-campaign-modal input#name"
    );

    const name = $nameInput.value;

    Store.updateCampaign(id, name);
    closeEditModal();
  }

  // Event handler for editCampaign event
  function updateCampaignRow(campaign) {
    const { id, name, lastSaved } = campaign;
    const $campaignRowNameEl = document.querySelector(
      `[data-campaign-id="${id}"] td.name`
    );
    const $campaignRowLastSavedEl = document.querySelector(
      `[data-campaign-id="${id}"] td.last-saved`
    );

    $campaignRowNameEl.innerHTML = name;
    $campaignRowLastSavedEl.innerHTML = Utils.formatTime(lastSaved);
  }

  //Event handlers

  EventMod.on("deleteCampaign", render);
  EventMod.on("changePage", render);
  EventMod.on("search", render);
  EventMod.on("editCampaign", updateCampaignRow);

  // Initialize render
  render();

  return {
    showEditModal,
    closeEditModal,
    onUpdate: onUpdateHandler
  };
})();
