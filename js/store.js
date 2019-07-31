// This is a Singleton of the state of the application.
const Store = new (class {
  // Construtor initializes the store with its values
  constructor() {
    this.campaigns = _campaigns;
    this.page = {
      current: 1,
      total: Math.ceil(this.campaigns.length / 10),
      resultPerPage: 10
    };
    this.selectedCampaignIds = [];
    this.searchText = "";
  }

  // The search text on the store is updated and emits an event
  updateSearchText(searchText) {
    this.searchText = searchText;
    this.resetPagination();

    EventMod.emit("search");
  }

  // Fetch a campaign by its _id
  getCampaignById(id) {
    return this.campaigns.find(c => c._id === id);
  }

  // Fetch all the campaign results
  getAllCampaignResults() {
    return this.searchText
      ? this.campaigns.filter(
          c =>
            c.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
        )
      : this.campaigns;
  }

  // Get the campaings in the current page
  getCurrentCampaignResultPage() {
    const result = this.getAllCampaignResults();
    const { current, resultPerPage } = this.page;

    return result.slice(
      (current - 1) * resultPerPage,
      (current - 1) * resultPerPage + resultPerPage
    );
  }

  // Change the current page and emit an event
  changeCurrentPage(pageNumber) {
    const totalCount = this.page.total;
    const prev = this.page.current;

    if (totalCount >= pageNumber && pageNumber >= 1 && prev !== pageNumber) {
      this.page.current = pageNumber;
      EventMod.emit("changePage", { pageNumber });
    }
  }

  // Update the pagination: Called while user starts searching and also during the delete operation
  updatePagination() {
    const results = this.getAllCampaignResults();
    const { current, resultPerPage } = this.page;
    const total = Math.ceil(results.length / resultPerPage);

    this.page = {
      current: current > total ? total : current,
      total,
      resultPerPage
    };
  }

  // Reset the pagination when the user searches
  resetPagination() {
    this.updatePagination();
    this.page.current = 1;
  }

  // Toggle the selected campaigns and emit an event
  toggleSelection(campaignId) {
    const index = this.selectedCampaignIds.findIndex(_id => _id === campaignId);

    if (index === -1) this.selectedCampaignIds.push(campaignId);
    else this.selectedCampaignIds.splice(index, 1);

    EventMod.emit("toggleSelection");
  }

  // Update the campaign details and emit an event with the payload
  updateCampaign(id, name) {
    const index = this.campaigns.findIndex(c => c._id === id);

    if (index !== -1) {
      this.campaigns[index].name = name;
      const lastSaved = new Date();
      this.campaigns[index].lastSaved = lastSaved;
      EventMod.emit("editCampaign", { id, name, lastSaved });
    }
  }

  // Bulk delete of selected campaigns
  deleteSelected() {
    this.selectedCampaignIds.forEach(id => {
      const index = this.campaigns.findIndex(c => c._id === id);
      this.campaigns.splice(index, 1);
    });

    this.selectedCampaignIds = [];
    this.updatePagination();
    EventMod.emit("deleteCampaign");
  }

  // Delete a campaign by its _id
  deleteCampaign(campaignId) {
    const index = this.campaigns.findIndex(c => c._id === campaignId);

    if (index !== -1) {
      this.campaigns.splice(index, 1);
      this.updatePagination();
      EventMod.emit("deleteCampaign");
    }
  }
})();
