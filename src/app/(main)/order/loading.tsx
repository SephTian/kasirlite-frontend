function loading() {
  const LOADING_MENU_CARD_COUNT = 12;
  const LOADING_CART_CARD_COUNT = 4;
  const menuCardElement = [];
  const cartCardElement = [];
  for (let index = 0; index < LOADING_MENU_CARD_COUNT; index++) {
    menuCardElement.push(<div key={index} className="h-52 bg-slate-300 rounded-sm"></div>);
  }
  for (let index = 0; index < LOADING_CART_CARD_COUNT; index++) {
    cartCardElement.push(<div key={index} className="h-20 bg-slate-300 rounded-sm"></div>);
  }

  return (
    <div className="w-full min-h-[80vh] grid grid-cols-4 gap-6 ">
      <div className="col-span-3 space-y-4 p-6 rounded-md bg-white shadow-lg animate-pulse">
        <div className="w-full h-12 bg-slate-300 rounded-sm"></div>
        <div className="w-full h-12 bg-slate-300 rounded-sm"></div>
        <h1 className="font-semibold">Daftar makanan:</h1>
        <div className="grid grid-cols-5 gap-3">{menuCardElement}</div>
      </div>
      <div className="min-w-[100px] w-full px-6 py-10 bg-white border border-gray-200 rounded-lg shadow-lg space-y-3">{cartCardElement}</div>
    </div>
  );
}

export default loading;
