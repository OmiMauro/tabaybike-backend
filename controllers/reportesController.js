import PDFDocument from 'pdfkit'
import fs from 'fs'
const generarPDFInscripcion = async(req,res)=>{
  const pdf = new PDFDocument({
    
  })
}

router.post('/pagar',function(req,res){
	var nombre = req.body.nombre;
    var apellidoPaterno = req.body.apellidoPaterno;
    var apellidoMaterno = req.body.apellidoMaterno;
    var fs = require('fs');
    var PDFDocument = require('pdfkit');
    
    var pdf = new PDFDocument({
        //size: 'LEGAL', 
        layout: 'landscape',
        size: [210, 210], 
        margin: 5,     
        info: {    
             Title: 'Recibo de agua potable',
             Author: 'Comite de agua potable 2018',
        }  
    });

    // Write stuff into PDF
    pdf.moveDown()
         .fillColor('black')
         .fontSize(7)
         .text('EJEMPLO DE DOCUMENTO PDF', {
           align: 'center',
           indent: 2,
           height: 2,
           ellipsis: true
         });
         

    pdf.moveDown()
         .fillColor('black')
         .fontSize(7)
         .text('NOMBRE DE PERSONAS DESDE FORMULARIO', {
           align: 'center',
           indent: 2,
           height: 2,
           ellipsis: true
         });
          


     pdf.moveDown()
         .fillColor('black')
         .fontSize(8)
         .text('NOMBRE: '+nombre+' '+ apellidoPaterno +' '+ apellidoMaterno , {
           align: 'left',
           indent: 2,
           height: 2,
           ellipsis: true
         });


      // Stream contents to a file
     pdf.pipe(fs.createWriteStream(nombre+"_"+apellidoPaterno+"_"+apellidoMaterno+'.pdf')).on('finish', function () {
        console.log('Archivo creado satisfactoriamente ....');
     });
 
     pdf.end();

});

module.exports = router;