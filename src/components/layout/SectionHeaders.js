function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <div className="text-center">
      <h3 className="uppercase text-secondary font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </div>
  );
}

export default SectionHeaders;
