import "./ImageLinkForm.css";

function ImageLinkForm({
  onInputChange,
  onPictureSubmit,
  imageUrl = "",
  loading = false,
  error = null,
}) {
  return (
    <>
      <div>
        <p className="f3">
          {`This Magic Brain will detect faces in your pictures. Give it a try`}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="text"
              onChange={onInputChange}
              value={imageUrl}
              placeholder="Enter image URL"
              disabled={loading}
            />
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={onPictureSubmit}
              disabled={loading || !imageUrl}
            >
              {loading ? "Detecting..." : "Detect"}
            </button>
          </div>
          {error && <p className="f5 mt3 red">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default ImageLinkForm;
