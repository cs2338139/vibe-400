export default function Footer(className) {
  return (
    <div
      className={`${className} flex h-[10.8125rem] w-full flex-col justify-between bg-sec-3 px-16 py-10 text-pr-1 sm:items-center`}>
      <div className="text-head-2 hidden text-[1.5rem] sm:block">ZOENW</div>

      <div className="flex h-full items-center justify-between sm:h-auto sm:flex-col">
        <div className="text-body-2">
          <button className="hover:text-pr-2">Privacy Policy</button> ／ VIBE
          Site
        </div>
        <div className="text-head-2 text-[2.5rem] sm:hidden">VIBE 400</div>
        <div className="text-body-2">© original JinCheng TW CO.,LTD</div>
      </div>
    </div>
  );
}
