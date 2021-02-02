<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/accounts">
        <accounts>
            <xsl:apply-templates/>
        </accounts>
    </xsl:template>
    <xsl:template match="account">
        <xsl:element name="account">
            <xsl:attribute name="id">
                <xsl:value-of select="@id"/>
            </xsl:attribute>
            <xsl:attribute name="name">
                <xsl:value-of select="name/first"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="name/middle"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="name/last"/>
            </xsl:attribute>
            <xsl:apply-templates select="transactions"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="transactions">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="transaction">
        <xsl:element name="transaction">
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="date">
        <xsl:element name="date">
            <xsl:value-of select="month"/>
            <xsl:text> </xsl:text>
            <xsl:value-of select="day"/>
            <xsl:text>, </xsl:text>
            <xsl:value-of select="year"/>
            <xsl:text> </xsl:text>
            <xsl:value-of select="time"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="amount">
        <xsl:element name="amount">
            <xsl:value-of select="."/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="product">
        <xsl:element name="product">
            <xsl:value-of select="."/>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>