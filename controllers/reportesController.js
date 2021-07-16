import Inscription from '../models/inscription.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
const generarPDFInscripcion = async (req, res) => {
  const listInscriptions = await Inscription.find({}).sort({ lastname: 1, name: 1, DNI: 1, locationOrigin: 1, provinceOrigin: 1 }).lean()
  const pdf = new PDFDocument({
    size: 'A4',
    info: {
      Title: 'Inscripcion al IV Encuentro Provincial de MTB',
      Author: 'Tabay Bike'
    }
  })
  for (let i = 0; i < listInscriptions.length; i++) {
    pdf.moveDown()
      .fillColor('black')
      .fontSize(13)
      .text('TABAY BIKE JARDÍN AMÉRICA 24 Y 25 DE JULIO DE 2021', {
        align: 'center'
      })
    pdf.moveDown()
      .fillColor('black')
      .fontSize(12).font('Helvetica')
      .text('Deslinde de Responsabilidad: ', {
        align: 'left'
      })
    pdf.moveDown()
      .fontSize(11).font('Helvetica')
      .text(`1.- Por la presente, declaro tener conocimiento y aceptar el Reglamento Deportivo y Disciplinario de IV ENCUENTRO PROVINCIAL DE CICLOTURISMO MTB. 
      2.- Declaro que los datos provistos por mí en la Ficha de Inscripción son reales y asumo la responsabilidad de los mismos. 
      3.- Me hago responsable por mí estado físico declarando gozar de buena salud habiendo tenido controles médicos regulares que indicaban dicho estado y no ser portador de COVID 19 y no presentar síntomas inherentes a dicha afección.- Declaro estar entrenado adecuadamente para participar de la fecha de cicloturismo autoasistido. Me hago responsable por los accidentes que pudiera sufrir antes, durante y después de la competencia. -Declaro conocer que existen tramos peligrosos en los que deberé extremar la precaución, así como descensos prolongados con curvas en los que moderaré la velocidad a fin de evitar daños propios y/o ajenos. También es de mi conocimiento que existen sectores en los que el estado de los caminos o sendas pueden no reunir las adecuadas condiciones de seguridad, excluyendo de la responsabilidad por cualquier perjuicio que sufriera debido al mal estado de las sendas o por motivo de defectos en las infraestructuras viarias, asimismo, asumo expresamente que estoy participando en una actividad deportiva de riesgo físico, SOY CONSCIENTE que existe la posibilidad de sufrir un accidente (caídas, contacto con otros participantes, consecuencias del clima, tránsito vehicular, condiciones del camino y/o cualquier otra clase de riesgo que se pudiera ocasionar) inherente a la práctica del ciclismo de montaña, asumiendo personalmente la responsabilidad y las costas de los mismos que pudiera causarme o causar a cualquier participante de la prueba, eximiendo y manteniendo indemne a la Organización, a los Auspiciantes, Sponsor y Organismos de Gobierno que pudieran estar involucrados en la organización del evento de cualquier responsabilidad derivada de estos accidentes.
      4.- Me hago responsable por mí seguridad, hidratación y alimentación eximiendo a la organización, auspiciantes y demás organismos públicos o privados que pudieran estar involucrados en el evento.
      5.- En caso de accidente o descompensaciones, acepto ser atendido en el lugar del hecho y ser transportado hasta el lugar de Asistencia Médica Primaria, donde se da por concluida la responsabilidad de/los organizadores para conmigo, pasando a ser la consecución del hecho, responsabilidad del participante. 
      6.- Por este instrumento cedo todos los derechos de utilización de mi imagen, renunciando a recibir cualquier renta proveniente por derecho de televisión o cualquier otro tipo de trasmisión o difusión de las competencias que son de propiedad de Tabay Bike Jardín América.`
      , { align: 'justify' })
    pdf.moveDown()
      .fontSize(11).font('Helvetica').text('Apellido y Nombre/s: ', { continued: true }).font('Helvetica-Bold').text(`${listInscriptions[i].lastname}, ${listInscriptions[i].name}.`)
    pdf.moveDown().fontSize(11).font('Helvetica').text('DNI: ', { continued: true }).font('Helvetica-Bold').text(`${listInscriptions[i].DNI}`)
    pdf.moveDown().fontSize(11).font('Helvetica').text('Lugar de precedencia: ', { continued: true }).font('Helvetica-Bold').text(`${listInscriptions[i].locationOrigin !== 'Otro' ? listInscriptions[i].locationOrigin : '______________________'}, ${listInscriptions[i].provinceOrigin}.`)
    pdf.moveDown().fontSize(11).font('Helvetica').text('Medio de contacto: ', { continued: true }).font('Helvetica-Bold').text(`${listInscriptions[i].numberCell ? listInscriptions[i].numberCell : listInscriptions[i].email}`)
    pdf.moveDown()
    pdf.moveDown().fontSize(11).font('Helvetica-Bold').text('Firma del participante', { align: 'right' })
    pdf.addPage()
  }
  // Stream contents to a file
  pdf.pipe(fs.createWriteStream('TabayBikeInscripciones.pdf')).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....')
  })

  pdf.end()
}

export default generarPDFInscripcion
