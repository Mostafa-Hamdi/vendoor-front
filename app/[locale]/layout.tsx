export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = params.locale === "ar" ? "rtl" : "ltr";

  // بدل ما تحط <body> تاني، حط div أو section أو html attributes بطريقة تانية
  return (
    <div lang={params.locale || "en"} dir={dir} style={{ direction: dir }}>
      {children}
    </div>
  );
}
