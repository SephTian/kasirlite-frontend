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
    <div className="w-full p-4 sm:h-[calc(100vh-86px)] grid grid-cols-1 sm:grid-cols-6 border rounded-lg bg-[#fdfdfd] gap-3">
      <div className="flex flex-col gap-4 h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-4 bg-white">
        <div className="w-full h-12 bg-slate-300 rounded-sm animate-pulse"></div>
        <div className="w-full h-12 bg-slate-300 rounded-sm animate-pulse"></div>
        <h1 className="font-semibold">Daftar makanan:</h1>
        <div className="w-full p-2 min-h-0 flex-auto overflow-y-scroll rounded-lg bg-slate-100 shadow-inner">
          <div className="grid grid-cols-5 gap-3 animate-pulse">{menuCardElement}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 w-full min-w-[100px] h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-2 animate-pulse">
        <div className="flex flex-col gap-2">{cartCardElement}</div>
        <div className="space-y-3">
          <div className="w-full h-12 bg-slate-300 rounded-sm animate-pulse"></div>
          <div className="w-full h-12 bg-slate-300 rounded-sm animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default loading;
