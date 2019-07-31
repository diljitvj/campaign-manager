const Store = new (class {
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

  updateSearchText(searchText) {
    this.searchText = searchText;
    this.resetPagination();

    EventMod.emit("search");
  }

  getCampaignById(id) {
    return this.campaigns.find(c => c._id === id);
  }

  getAllCampaignResults() {
    return this.searchText
      ? this.campaigns.filter(
          c =>
            c.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
        )
      : this.campaigns;
  }

  getCurrentCampaignResultPage() {
    const result = this.getAllCampaignResults();
    const { current, resultPerPage } = this.page;

    return result.slice(
      (current - 1) * resultPerPage,
      (current - 1) * resultPerPage + resultPerPage
    );
  }

  changeCurrentPage(pageNumber) {
    const totalCount = this.page.total;
    const prev = this.page.current;

    if (totalCount >= pageNumber && pageNumber >= 1 && prev !== pageNumber) {
      this.page.current = pageNumber;
      EventMod.emit("changePage", { pageNumber });
    }
  }

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

  resetPagination() {
    this.updatePagination();
    this.page.current = 1;
  }

  toggleSelection(campaignId) {
    const index = this.selectedCampaignIds.findIndex(_id => _id === campaignId);

    if (index === -1) this.selectedCampaignIds.push(campaignId);
    else this.selectedCampaignIds.splice(index, 1);

    EventMod.emit("toggleSelection");
  }

  updateCampaign(id, name) {
    const index = this.campaigns.findIndex(c => c._id === id);

    if (index !== -1) {
      this.campaigns[index].name = name;
      const lastSaved = new Date();
      this.campaigns[index].lastSaved = lastSaved;
      EventMod.emit("editCampaign", { id, name, lastSaved });
    }
  }

  deleteSelected() {
    this.selectedCampaignIds.forEach(id => {
      const index = this.campaigns.findIndex(c => c._id === id);
      this.campaigns.splice(index, 1);
    });

    this.selectedCampaignIds = [];
    this.updatePagination();
    EventMod.emit("deleteCampaign");
  }

  deleteCampaign(campaignId) {
    const index = this.campaigns.findIndex(c => c._id === campaignId);

    if (index !== -1) {
      this.campaigns.splice(index, 1);
      this.updatePagination();
      EventMod.emit("deleteCampaign");
    }
  }
})();
