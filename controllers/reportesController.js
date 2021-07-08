import Inscription from '../models/inscription.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
const generarPDFInscripcion = async (req, res) => {
  const listInscriptions = await Inscription.find({}).sort({ lastname: 1, name: 1 }).lean()
  const date = new Date().getDate()
  const pdf = new PDFDocument({
    size: 'A4',
    margin: 10,
    font: 'Times-Roman',
    info: {
      Title: 'Inscripcion al IV Encuentro Provincial de MTB',
      Author: 'Tabay Bike'
    }
  })
  for (let i = 1; i <= 20; i++) {
  // Write stuff into PDF
    pdf.moveDown()
      .fillColor('black')
      .fontSize(16)
      .text(`Inscripción para el IV Encuentro provincial de MTB.\n ${date}`, {
        align: 'center',
        indent: 2,
        height: 5,
        underline: true
      })
    pdf.moveDown()
      .fillColor('black')
      .fontSize(14)
      .text('Datos del participante:', {
        align: 'center',
        indent: 2,
        height: 2,
        ellipsis: true
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
        x: 5
      })
    pdf.rect(50, 50, pdf.widthOfString(), pdf.y).stroke()

    pdf.addPage()
  }
  // Stream contents to a file
  pdf.pipe(fs.createWriteStream('prueba.pdf')).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....')
  })

  pdf.end()
}

export default generarPDFInscripcion