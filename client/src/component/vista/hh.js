return (
    <div className="body">
      {showUpgradeModal && (
        <div className="upgrade-modal">
          <div className="upgrade-modal-content">
            <h2>Upgrade to the Pro Plan</h2>
            <p>
              To access the chatbot feature, you need to upgrade to the Pro plan.
            </p>
            <button
              className="btn btn-success"
              onClick={() => history.push("/upgrade-plan")}
            >
              Upgrade Now
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowUpgradeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rest of the component */}
    </div>
  );
}
