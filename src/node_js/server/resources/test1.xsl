<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/1999/xhtml"
                version="1.0">
    <xsl:template match="note[@type='caution']">
        <html>
            <head>
                <title>Caution!</title>
            </head>
            <body>
                <h2>WAIT JUST A SECOND THERE!!!</h2>
                <p><b>USE EXTREME CAUTION:</b></p>
                <xsl:apply-templates select="p"/>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="p[not(position() = 1)]">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="bold">
        <b><xsl:apply-templates/></b>
    </xsl:template>
</xsl:stylesheet>