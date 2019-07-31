const Campaign = (function() {
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

  function closeEditModal() {
    const $modalWrapperEl = document.querySelector(".modal-wrapper");
    $modalWrapperEl.innerHTML = "";
    $modalWrapperEl.classList.add("hide");
  }

  function onUpdateHandler(id) {
    const $nameInput = document.querySelector(
      ".edit-campaign-modal input#name"
    );

    const name = $nameInput.value;

    Store.updateCampaign(id, name);
    closeEditModal();
  }

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

  EventMod.on("deleteCampaign", render);
  EventMod.on("changePage", render);
  EventMod.on("search", render);
  EventMod.on("editCampaign", updateCampaignRow);

  render();

  return {
    showEditModal,
    closeEditModal,
    onUpdate: onUpdateHandler
  };
})();
