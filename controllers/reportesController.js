import Inscription from '../models/inscription.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
const generarPDFInscripcion = async (req, res) => {
  const listInscriptions = await Inscription.find({}).sort({ lastname: 1, name: 1 }).lean()
  const pdf = new PDFDocument({
    size: 'A4',
    font: 'Times-Roman',
    info: {
      Title: 'Inscripcion al IV Encuentro Provincial de MTB',
      Author: 'Tabay Bike'
    }
  })
  console.log(listInscriptions.length)
  for (let i = 1; i < listInscriptions.length; i++) {
  // Write stuff into PDF
    pdf.moveDown()
      .fillColor('black')
      .fontSize(16)
      .text('Inscripción para el IV Encuentro provincial de MTB.', {
        align: 'center',
        underline: true
      })
    pdf.moveDown()
      .fillColor('black')
      .fontSize(14)
      .text('Datos del participante:', {
        align: 'center'

      })
    pdf.moveDown()
      .fillColor('black')
      .fontSize(13)
      .text(`Declaro que Nombre: ${listInscriptions[i].name},   Apellido:  ${listInscriptions[i].lastname} ,       cuyo DNI es:   ${listInscriptions[i].DNI}   ,     soy completamente responsable de mi propia integridad física en todo momento en la participación,      dejando libre de responsabilidades      a todos los organizadores del evento y auspiciantes. `, {
        align: 'justify',
        width: 500
      })
    pdf.moveDown()
      .fontSize(13)
      .text('Firma                                  Aclaración                            DNI', {
        columnsGap: 50,
        columns: 1,
        paragraphGap: 50
      })
    pdf.moveDown().fontSize(270).text(`${i}`, { align: 'center', valign: 'center' })
      .fontSize(25).text(` ${listInscriptions[i].lastname}, ${listInscriptions[i].name}`, { align: 'center', valign: 'center' })

    pdf.addPage()
  }
  // Stream contents to a file
  pdf.pipe(fs.createWriteStream('prueba.pdf')).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....')
  })

  pdf.end()
}

export default generarPDFInscripcion
