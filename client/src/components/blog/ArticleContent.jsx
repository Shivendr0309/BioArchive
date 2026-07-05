function ArticleContent({ content }) {
  return (
    <section className="
my-10
rounded-[36px]
border
border-slate-200
bg-white
px-8
py-10
shadow-sm
dark:border-slate-800
dark:bg-slate-900
lg:px-16
lg:py-14
">
      <article
       className="
prose
prose-lg
max-w-none

prose-headings:font-black
prose-headings:tracking-tight
prose-headings:text-slate-900
prose-headings:scroll-mt-24

prose-h1:text-5xl
prose-h2:mt-16
prose-h2:text-4xl
prose-h3:mt-12
prose-h3:text-3xl

prose-p:my-7
prose-p:text-[18px]
prose-p:leading-9
prose-p:text-slate-700

prose-a:font-semibold
prose-a:text-indigo-600
prose-a:no-underline
hover:prose-a:underline

prose-strong:font-semibold
prose-strong:text-slate-900

prose-ul:my-8
prose-ol:my-8

prose-li:my-2
prose-li:text-[18px]
prose-li:text-slate-700

prose-img:rounded-3xl
prose-img:shadow-xl

prose-hr:my-14

prose-blockquote:rounded-r-2xl
prose-blockquote:border-l-4
prose-blockquote:border-indigo-500
prose-blockquote:bg-slate-50
prose-blockquote:px-8
prose-blockquote:py-5
prose-blockquote:text-slate-700

prose-code:rounded-md
prose-code:bg-slate-100
prose-code:px-2
prose-code:py-1
prose-code:text-pink-600
prose-code:before:content-none
prose-code:after:content-none

prose-pre:overflow-x-auto
prose-pre:rounded-3xl
prose-pre:bg-[#0f172a]
prose-pre:p-6
prose-pre:shadow-xl

prose-table:block
prose-table:overflow-x-auto

dark:prose-invert
dark:prose-blockquote:bg-slate-800/50
dark:prose-blockquote:border-indigo-400
"
      >
       <div className="mx-auto max-w-4xl">
  <div
    dangerouslySetInnerHTML={{
      __html:
        content ||
        "<p>No content available.</p>",
    }}
  />
</div>
      </article>
    </section>
  );
}

export default ArticleContent;