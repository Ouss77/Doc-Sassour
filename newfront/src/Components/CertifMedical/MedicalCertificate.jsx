import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';

const MedicalCertificate = ({ date, name, cin, days, startDate, endDate, medicament, medicamentForme }) => {
  const certificateRef = useRef();

  const handleDownloadPDF = () => {
    const input = certificateRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
      });
      const imgWidth = 148; // A5 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.height;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;
      }

      pdf.save('MedicalCertificate_A5.pdf');
    });
  };

  return (
    <div>
      <div
        ref={certificateRef}
        className="p-4 max-w-[148mm] mx-auto bg-white shadow-md rounded-md border h-screen"
        style={{ width: '148mm', height: '210mm' }}
      >
        <header className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="text-left">
            <h1 className="text-lg font-bold">Docteur SASSOUR Mohammed</h1>
            <p className="text-sm">Ancien Médecin militaire lt Colonel</p>
            <p className="text-sm">Médecine Générale</p>
            <p className="text-sm">Médecine du sport</p>
            <p className="text-sm">Maladies sexuellement transmissibles</p>
            <p className="text-sm">N°2, 1er étage, angle Bdouvaud Mohamed V et Ibn Battouta, Guercif</p>
            <p className="text-sm">Tel: 0672231406 / 0661255659</p>
          </div>
          {/* <div className="text-center my-4">
            <FontAwesomeIcon icon={faStethoscope} className="text-black text-6xl mx-4" />
          </div> */}
          <div className="text-right">
            <h1 className="text-lg font-bold">الدكتور ساسور محمد</h1>
            <p className="text-sm">طبيب عسكري لـ كولونيل سابقًا</p>
            <p className="text-sm">الطب العام</p>
            <p className="text-sm">طب الرياضة</p>
            <p className="text-sm">الأمراض المنقولة جنسياً</p>
            <p className="text-sm">ن°2، الطابق الأول، زاوية بدوفواد محمد الخامس وإبن بطوطة، جرسيف</p>
            <p className="text-sm">الهاتف: 0672231406 / 0661255659</p>
          </div>
        </header>
        <div className="mb-4 text-center">
          <p className="font-bold text-lg mb-4">GUERCIF LE <span className="underline">{date}</span></p>
        </div>
        <h2 className="text-lg font-bold text-center mb-4">CERTIFICAT MEDICAL</h2>
        <div className="mx-4">
          <p className="mb-4 text-sm">Je soussigné, SASSOUR MOHAMMED, docteur en médecine certifie avoir examiné ce jour le (la) nommé(e)</p>
          <p className="mb-4 font-bold text-lg underline">{name}</p>
          <p className="mb-4 text-sm">CIN: <span className="font-bold">{cin}</span></p>
          <p className="mb-4 text-sm">Son état de santé nécessite un traitement médical et un repos de</p>
          <p className="mb-4 font-bold text-lg"><span className="underline">{days}</span> jours valables du <span className="underline">{startDate}</span> au <span className="underline">{endDate}</span> inclus sauf complications.</p>
          <p className="mb-4 text-sm">Le malade doit prendre: {medicament}( {medicamentForme} ) </p>
          <p className="mb-8 text-sm">Certificat établi à la demande de l’intéressé(e) pour servir et valoir ce que de doit.</p>
        </div>
      </div>

      {/* This button is for PDF download and will not be included in the PDF */}
      <div className="text-center mt-6">
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleDownloadPDF}
        >
          Telecharger le certificat
        </button>
      </div>
    </div>
  );
};

export default MedicalCertificate;
